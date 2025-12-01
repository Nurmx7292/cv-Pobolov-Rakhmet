import { useState, type RefObject } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { useNotification } from "@shared/lib/notifications";

const EXPORT_PDF = gql`
    mutation ExportPdf($pdf: ExportPdfInput!) {
        exportPdf(pdf: $pdf)
    }
`;

interface ExportPdfResponse {
    exportPdf: string;
}

interface ExportPdfVariables {
    pdf: {
        html: string;
        margin: {
            top: string;
            bottom: string;
            left: string;
            right: string;
        };
    };
}

interface ExportPdfButtonProps {
    elementRef: RefObject<HTMLElement | null>;
    fileName?: string;
}

const prepareHtml = (content: HTMLElement): string => {
    const clone = content.cloneNode(true) as HTMLElement;
    
    const styleSheets = Array.from(document.styleSheets);
    let cssText = "";
    
    styleSheets.forEach((sheet) => {
        try {
            const rules = Array.from(sheet.cssRules || sheet.rules || []);
            rules.forEach((rule) => {
                cssText += rule.cssText + "\n";
            });
        } catch (e) {
            console.warn("Could not access stylesheet:", e);
        }
    });
    
    const styleElement = document.createElement("style");
    styleElement.textContent = cssText;
    
    const wrapper = document.createElement("div");
    wrapper.appendChild(clone);
    wrapper.appendChild(styleElement);
    
    return wrapper.outerHTML;
};

const downloadPdf = (name: string, base64: string) => {
    const src = `data:application/pdf;base64,${base64}`;
    const link = document.createElement("a");
    link.href = src;
    link.download = name + ".pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const ExportPdfButton = ({ elementRef, fileName = "cv" }: ExportPdfButtonProps) => {
    const [exportPdf, { loading }] = useMutation<ExportPdfResponse, ExportPdfVariables>(EXPORT_PDF);
    const { showNotification, NotificationComponent } = useNotification();
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        if (!elementRef.current) {
            showNotification("Failed to export PDF: content not found", "error");
            return;
        }

        try {
            setIsExporting(true);
            const html = prepareHtml(elementRef.current);
            
            const result = await exportPdf({
                variables: {
                    pdf: {
                        html,
                        margin: {
                            top: "15mm",
                            bottom: "15mm",
                            left: "12mm",
                            right: "12mm",
                        },
                    },
                },
            });

            if (result.data?.exportPdf) {
                downloadPdf(fileName, result.data.exportPdf);
                showNotification("PDF exported successfully", "success");
            }
        } catch (error) {
            console.error("Failed to export PDF:", error);
            showNotification("Failed to export PDF", "error");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <>
            <Button
                variant="outlined"
                sx={{
                    width: "158px",
                    "@media print": {
                        display: "none",
                    },
                }}
                onClick={handleExport}
                disabled={loading || isExporting}
            >
                {loading || isExporting ? <CircularProgress size={20} /> : "EXPORT PDF"}
            </Button>
            <NotificationComponent />
        </>
    );
};

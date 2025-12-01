import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { useNotification } from "@shared/lib/notifications";

const EXPORT_PDF = gql`
    mutation ExportPdf($cvId: ID!) {
        exportPdf(cvId: $cvId)
    }
`;

interface ExportPdfResponse {
    exportPdf: string;
}

interface ExportPdfVariables {
    cvId: string;
}

interface ExportPdfButtonProps {
    cvId: string;
}

export const ExportPdfButton = ({ cvId }: ExportPdfButtonProps) => {
    const [exportPdf, { loading }] = useMutation<ExportPdfResponse, ExportPdfVariables>(EXPORT_PDF);
    const { showNotification, NotificationComponent } = useNotification();
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        try {
            setIsExporting(true);
            const result = await exportPdf({
                variables: { cvId },
            });

            if (result.data?.exportPdf) {
                const link = document.createElement("a");
                link.href = result.data.exportPdf;
                link.download = `CV-${cvId}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
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
                variant="contained"
                startIcon={loading || isExporting ? <CircularProgress size={20} /> : <PictureAsPdfIcon />}
                onClick={handleExport}
                disabled={loading || isExporting}
                className="no-print"
            >
                Export PDF
            </Button>
            <NotificationComponent />
        </>
    );
};


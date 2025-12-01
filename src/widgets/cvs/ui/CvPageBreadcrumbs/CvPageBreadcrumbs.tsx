import { useTheme } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import type { Cv } from "@entities/cv";

interface CvPageBreadcrumbsProps {
    cv: Cv | null;
    linkName: string;
    isCvLink: boolean;
}

const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const CvPageBreadcrumbs = ({
    cv,
    linkName,
    isCvLink,
}: CvPageBreadcrumbsProps) => {
    const theme = useTheme();

    return (
        <Breadcrumbs separator={">"}>
            <Link
                component={RouterLink}
                to="/cvs"
                sx={{
                    color: "text.secondary",
                    textDecoration: "none",
                    "&:hover": {
                        textDecoration: "underline",
                    },
                }}
            >
                CVs
            </Link>
            {!isCvLink && cv && (
                <Link
                    component={RouterLink}
                    to={`/cvs/${cv.id}/details`}
                    sx={{
                        color: "text.secondary",
                        textDecoration: "none",
                        "&:hover": {
                            textDecoration: "underline",
                        },
                    }}
                >
                    {cv.name}
                </Link>
            )}
            {!isCvLink && (
                <Typography sx={{ color: "text.secondary" }}>
                    {capitalize(linkName)}
                </Typography>
            )}
            {isCvLink && cv && (
                <Typography sx={{ color: theme.palette.primary.main }}>
                    {cv.name}
                </Typography>
            )}
        </Breadcrumbs>
    );
};


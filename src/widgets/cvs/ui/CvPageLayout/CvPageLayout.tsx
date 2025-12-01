import { useParams, useLocation, Outlet, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useCv, type Cv } from "@entities/cv";
import { CvPageBreadcrumbs } from "../CvPageBreadcrumbs/CvPageBreadcrumbs";

const getInitialLink = (pathname: string): number => {
    if (pathname.includes("/details")) return 0;
    if (pathname.includes("/skills")) return 1;
    if (pathname.includes("/projects")) return 2;
    if (pathname.includes("/preview")) return 3;
    return 0;
};

const getLinkName = (pathname: string): string => {
    if (pathname.includes("/details")) return "details";
    if (pathname.includes("/skills")) return "skills";
    if (pathname.includes("/projects")) return "projects";
    if (pathname.includes("/preview")) return "preview";
    return "details";
};

export interface CvPageContextValue {
    cv: Cv | null;
    refetch: () => void;
}

export const CvPageLayout = () => {
    const { cvId } = useParams<{ cvId: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const { data, loading, error, refetch } = useCv(cvId);

    const currentLink = useMemo(() => getInitialLink(location.pathname), [location.pathname]);
    const linkName = useMemo(() => getLinkName(location.pathname), [location.pathname]);
    const isCvLink = currentLink === 0;

    const cv = data?.cv || null;

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "400px",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "400px",
                }}
            >
                <Typography variant="h6" color="error">
                    Failed to load CV: {error.message}
                </Typography>
            </Box>
        );
    }

    if (!cv) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "400px",
                }}
            >
                <Typography variant="h6">CV not found</Typography>
            </Box>
        );
    }

    return (
        <Stack
            spacing={4}
            sx={{
                px: "1.5rem",
                height: "100%",
                overflow: "hidden",
            }}
        >
            <Stack
                spacing={1.5}
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    backgroundColor: "background.default",
                    pt: "1rem",
                    pb: "0.5rem",
                }}
            >
                <CvPageBreadcrumbs
                    cv={cv}
                    linkName={linkName}
                    isCvLink={isCvLink}
                />
                <Tabs
                    value={currentLink}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        "& .MuiTab-root": {
                            minWidth: "150px",
                        },
                    }}
                >
                    <Tab
                        label="Details"
                        onClick={() => navigate(`/cvs/${cvId}/details`)}
                    />
                    <Tab
                        label="Skills"
                        onClick={() => navigate(`/cvs/${cvId}/skills`)}
                    />
                    <Tab
                        label="Projects"
                        onClick={() => navigate(`/cvs/${cvId}/projects`)}
                    />
                    <Tab
                        label="Preview"
                        onClick={() => navigate(`/cvs/${cvId}/preview`)}
                    />
                </Tabs>
            </Stack>
            <Stack
                flexGrow={1}
                sx={{
                    overflow: "auto",
                    pb: "2rem",
                }}
            >
                <Outlet context={{ cv, refetch } as CvPageContextValue} />
            </Stack>
        </Stack>
    );
};


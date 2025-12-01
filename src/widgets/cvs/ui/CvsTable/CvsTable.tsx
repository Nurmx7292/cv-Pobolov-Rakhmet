import { useMemo, Fragment, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Box,
    CircularProgress,
    TableSortLabel,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useCvs, type CvListItem } from "@entities/cv";
import { CvsActionMenu } from "../CvsActionMenu/CvsActionMenu";

type SortKey = "name" | "email" | null;
type SortDirection = "asc" | "desc";

interface CvsTableProps {
    userId?: string;
    searchString?: string;
    onDelete?: (cv: CvListItem) => void;
}

const rowHeight = 72;

export const CvsTable = ({ userId, searchString = "", onDelete }: CvsTableProps) => {
    const { data, loading, error } = useCvs();
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up("md"));
    const isSm = useMediaQuery(theme.breakpoints.up("sm"));
    const [sortConfig, setSortConfig] = useState<{
        key: SortKey;
        direction: SortDirection;
    }>({
        key: null,
        direction: "asc",
    });

    const handleSort = (key: SortKey) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return {
                    key,
                    direction: prev.direction === "asc" ? "desc" : "asc",
                };
            }
            return { key, direction: "asc" };
        });
    };

    const filteredAndSortedCvs = useMemo(() => {
        if (!data?.cvs) return [];

        let filtered = data.cvs;

        if (userId) {
            filtered = filtered.filter((cv) => cv.user?.id === userId);
        }

        if (searchString) {
            const searchLower = searchString.toLowerCase();
            filtered = filtered.filter(
                (cv) =>
                    cv.name.toLowerCase().includes(searchLower) ||
                    cv.description.toLowerCase().includes(searchLower),
            );
        }

        if (sortConfig.key) {
            filtered = [...filtered].sort((a, b) => {
                let aValue: string | null = null;
                let bValue: string | null = null;

                if (sortConfig.key === "name") {
                    aValue = a.name;
                    bValue = b.name;
                } else if (sortConfig.key === "email") {
                    aValue = a.user?.email || null;
                    bValue = b.user?.email || null;
                }

                if (aValue === null && bValue === null) return 0;
                if (aValue === null) return 1;
                if (bValue === null) return -1;

                const comparison = aValue.localeCompare(bValue);
                return sortConfig.direction === "asc" ? comparison : -comparison;
            });
        }

        return filtered;
    }, [data?.cvs, userId, searchString, sortConfig]);

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
                    Failed to load CVs: {error.message}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
            <TableContainer sx={{ overflowY: "auto", flex: 1 }}>
                <Table size="medium" stickyHeader sx={{ opacity: loading ? 0.5 : 1 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                style={{
                                    flex: 1,
                                    cursor: "pointer",
                                    userSelect: "none",
                                }}
                                onClick={() => handleSort("name")}
                            >
                                <TableSortLabel
                                    active={sortConfig.key === "name"}
                                    direction={sortConfig.key === "name" ? sortConfig.direction : "asc"}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            {isMd && (
                                <TableCell
                                    style={{
                                        flex: 1,
                                    }}
                                >
                                    Education
                                </TableCell>
                            )}
                            {isSm && (
                                <TableCell
                                    style={{
                                        flex: 1,
                                        cursor: "pointer",
                                        userSelect: "none",
                                    }}
                                    onClick={() => handleSort("email")}
                                >
                                    <TableSortLabel
                                        active={sortConfig.key === "email"}
                                        direction={sortConfig.key === "email" ? sortConfig.direction : "asc"}
                                    >
                                        Employee
                                    </TableSortLabel>
                                </TableCell>
                            )}
                            <TableCell style={{ width: 100 }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAndSortedCvs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={isMd && isSm ? 4 : isSm ? 3 : 2} align="center">
                                    <Typography variant="body2" color="text.secondary">
                                        No CVs found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredAndSortedCvs.map((cv) => (
                                <Fragment key={cv.id}>
                                    <TableRow sx={{ height: rowHeight }} hover>
                                        <TableCell
                                            sx={(theme) => ({
                                                color: theme.palette.text.secondary,
                                            })}
                                        >
                                            {cv.name}
                                        </TableCell>
                                        {isMd && (
                                            <TableCell
                                                sx={(theme) => ({
                                                    color: theme.palette.text.secondary,
                                                })}
                                            >
                                                {cv.education}
                                            </TableCell>
                                        )}
                                        {isSm && (
                                            <TableCell
                                                sx={(theme) => ({
                                                    color: theme.palette.text.secondary,
                                                })}
                                            >
                                                {cv.user?.email || "-"}
                                            </TableCell>
                                        )}
                                        <TableCell align="right">
                                            {onDelete && (
                                                <CvsActionMenu cv={cv} onDelete={onDelete} />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                    {cv.description && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={isMd && isSm ? 4 : isSm ? 3 : 2}
                                                sx={(theme) => ({
                                                    color: theme.palette.text.secondary,
                                                })}
                                            >
                                                {cv.description}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </Fragment>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

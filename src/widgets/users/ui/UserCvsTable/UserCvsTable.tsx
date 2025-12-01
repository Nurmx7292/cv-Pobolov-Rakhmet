import { CvsTable } from "@widgets/cvs/ui/CvsTable/CvsTable";
import type { CvListItem } from "@entities/cv";

interface UserCvsTableProps {
    userId: string;
    onEdit?: (cv: CvListItem) => void;
    onDelete?: (cv: CvListItem) => void;
}

export const UserCvsTable = ({ userId, onEdit, onDelete }: UserCvsTableProps) => {
    return <CvsTable userId={userId} onEdit={onEdit} onDelete={onDelete} />;
};


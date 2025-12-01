import { CvsActionMenu } from "@widgets/cvs/ui/CvsActionMenu/CvsActionMenu";
import type { CvListItem } from "@entities/cv";

interface UserCvsActionMenuProps {
    cv: CvListItem;
    onEdit: (cv: CvListItem) => void;
    onDelete: (cv: CvListItem) => void;
}

export const UserCvsActionMenu = ({
    cv,
    onEdit,
    onDelete,
}: UserCvsActionMenuProps) => {
    return (
        <CvsActionMenu
            cv={cv}
            onEdit={onEdit}
            onDelete={onDelete}
        />
    );
};


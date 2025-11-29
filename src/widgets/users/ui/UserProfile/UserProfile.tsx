import React, {useEffect, useState} from 'react';
import styles from "./UserProfile.module.css";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client/react";
import {GET_USER_BY_ID_QUERY} from "@widgets/users/api/getUserByIdQuery";
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import {GET_DEPARTMENTS_QUERY} from "@widgets/users/api/getDepartmentsQuery";
import {GET_POSITIONS_QUERY} from "@widgets/users/api/getPositionsQuery";
import {MenuItem} from '@mui/material';
import {useMutation} from "@apollo/client/react";
import {UPDATE_USER_MUTATION} from "@widgets/users/api/updateUserMutation";
import {UPDATE_PROFILE_MUTATION} from "@widgets/users/api/updateProfileMutation.ts";
import {UPLOAD_AVATAR_MUTATION} from "@widgets/users/api/uploadAvatarMutation";
import Avatar from "@shared/components/avatar/ui/Avatar.tsx";

const UserProfile = () => {
    const [updateUser] = useMutation(UPDATE_USER_MUTATION);
    const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadAvatar] = useMutation(UPLOAD_AVATAR_MUTATION);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const onUploadAvatarClick = () => {
        fileInputRef.current?.click(); // открываем диалог
    };

    const onFileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const base64 = await fileToBase64(file);

        await uploadAvatar({
            variables: {
                avatar: {
                    userId: currentUserId,
                    base64,
                    size: file.size,
                    type: file.type,
                },
            },
        });
        await refetch();

    };

    function fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string); // сохраняем полный data URL
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }



    const [firstNameInputValue, setFirstNameInputValue] = useState('');
    const [lastNameInputValue, setLastNameInputValue] = useState('');
    const [departmentInputValue, setDepartmentInputValue] = useState('');
    const [positionInputValue, setPositionInputValue] = useState('');

    const [isUpdateDisabled, setIsUpdateDisabled] = useState(true)

    const {userId} = useParams<{ userId: string }>();
    const currentUserId = localStorage.getItem('currentUserId');


    const {loading, error, data, refetch} = useQuery(GET_USER_BY_ID_QUERY, {
        variables: {id: userId},
        skip: !userId,
        notifyOnNetworkStatusChange: false
    });

    const {loading: positionsLoading, error: positionsError, data: positionsData} = useQuery(GET_POSITIONS_QUERY);
    let positionsDataFromServer = positionsData?.positions ?? [];
    positionsDataFromServer = [{name: "", id: '0'}, ...positionsDataFromServer]


    let positions = null;
    if (positionsData) {
        positions = positionsData.positions.map((position) => position.name)
        positions.unshift('No position');
    }

    const {
        loading: departmentsLoading,
        error: departmentEerror,
        data: departmentsData
    } = useQuery(GET_DEPARTMENTS_QUERY);

    let departmentsDataFromServer = departmentsData?.departments ?? [];
    departmentsDataFromServer = [{name: "", id: '0'}, ...departmentsDataFromServer]

    let departments = null;
    if (departmentsData) {
        departments = departmentsData.departments.map((department) => department.name);
        departments.unshift('No department')
    }

    const user = data?.user;
    const profile = user?.profile;
    const firstName = profile?.first_name || '';
    const lastName = profile?.last_name || '';
    const department_name = user?.department_name || '';
    const position_name = user?.position_name || '';


    useEffect(() => {
        if (!user) return;

        setFirstNameInputValue(firstName);
        setLastNameInputValue(lastName);
        setDepartmentInputValue(department_name);
        setPositionInputValue(position_name);

    }, [user, firstName, lastName, department_name, position_name]);

    useEffect(() => {
        if (!user) return;

        const firstNameChanged = firstNameInputValue !== (profile?.first_name || '');
        const lastNameChanged = lastNameInputValue !== (profile?.last_name || '');
        const departmentChanged = departmentInputValue !== (user?.department_name || '');
        const positionChanged = positionInputValue !== (user?.position_name || '');

        setIsUpdateDisabled(!(firstNameChanged || lastNameChanged || departmentChanged || positionChanged));
    }, [firstNameInputValue, lastNameInputValue, departmentInputValue, positionInputValue, profile, user]);


    if (loading) return <div>Загрузка профиля...</div>;
    if (error) return <div>Ошибка загрузки: {error.message}</div>;
    if (!user) return <div>Пользователь не найден</div>;

    const created_at = user.created_at;
    const email = user.email;

    const date = new Date(+created_at);
    const memberSinceString = date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    });


    function getDepartmentIdByName(departments, name) {
        const dept = departments.find(d => d.name === name);
        return dept ? dept.id : null;
    }

    function getPositionIdByName(positions, name) {
        const position = positions.find(p => p.name === name);
        return position ? position.id : null;
    }


    const onUpdateButtonClick = async () => {

        const departmentId = getDepartmentIdByName(departmentsDataFromServer, departmentInputValue)?.toString()
        const positionId = getPositionIdByName(positionsDataFromServer, positionInputValue)?.toString()

        await updateUser({
            variables: {
                user: {
                    userId: currentUserId.toString(),
                    departmentId:  departmentId.toString(),
                    positionId: positionId.toString(),
                },
            },
        });


        await updateProfile({
            variables: {
                profile: {
                    userId: currentUserId.toString(),
                    first_name: firstNameInputValue,
                    last_name: lastNameInputValue
                },
            },
        });

        await refetch();
    };


    let updateButton = null;
    let uploadAvatarButton = null;
    let disableInputs = true;
    if (+currentUserId === +userId) {
        updateButton = <Button variant="contained" onClick={onUpdateButtonClick} disabled={isUpdateDisabled}>UPDATE</Button>;
        uploadAvatarButton =   <Button variant="contained" onClick={onUploadAvatarClick}>Upload Avatar</Button>;
        disableInputs = false;
    }

    const onDepartmentChange = (e) => {
        if (e.target.value === 'No department') {
            setDepartmentInputValue('')
        } else setDepartmentInputValue(e.target.value)
    }

    const onPositionChange = (e) => {
        if (e.target.value === 'No position') {
            setPositionInputValue('')
        } else setPositionInputValue(e.target.value)
    }


    return (
        <div className={styles.userProfile}>

            <div>{firstName} {lastName}</div>
            <div>{email}</div>
            <div>A member since {memberSinceString}</div>

            <div>
                <Avatar size={60}
                        avatarReference={user.profile.avatar}
                        firstName={firstNameInputValue}
                        lastName={lastNameInputValue}
                        email={email}
                />
            </div>


            <TextField
                className={styles.input}
                label="First Name"
                variant="outlined"
                value={firstNameInputValue}
                disabled={disableInputs}
                onChange={e => setFirstNameInputValue(e.target.value)}
                InputLabelProps={{shrink: firstNameInputValue !== ''}}
            />


            <TextField
                className={styles.input}
                label="Last Name"
                variant="outlined"
                value={lastNameInputValue}
                disabled={disableInputs}
                onChange={e => setLastNameInputValue(e.target.value)}
                InputLabelProps={{shrink: lastNameInputValue !== ''}}
            />


            <TextField
                className={styles.input}
                label="Department"
                variant="outlined"
                select
                value={departmentInputValue}
                disabled={disableInputs}
                onChange={onDepartmentChange}
            >
                {departments !== null ?

                    departments.map((department) => (
                        <MenuItem key={department} value={department}>
                            {department}
                        </MenuItem>
                    )) : null
                }
            </TextField>


            <TextField
                className={styles.input}
                label="Position"
                variant="outlined"
                select
                value={positionInputValue}
                disabled={disableInputs}
                onChange={onPositionChange}
            >
                {positions !== null ?

                    positions.map((position) => (
                        <MenuItem key={position} value={position}>
                            {position}
                        </MenuItem>
                    )) : null
                }
            </TextField>


            {updateButton}

            <input
                type="file"
                accept="image/png, image/jpeg, image/gif"
                ref={fileInputRef}
                style={{display: 'none'}} // скрываем input
                onChange={onFileSelected}
            />

            {uploadAvatarButton}

        </div>
    );
};

export default UserProfile;
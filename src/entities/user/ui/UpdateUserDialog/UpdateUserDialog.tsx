import React, {useEffect, useState} from 'react';
import styles from './UpdateUserDialog.module.css'
import {Button, MenuItem} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useMutation, useQuery} from "@apollo/client/react";
import {GET_DEPARTMENTS_QUERY} from "@widgets/users/api/getDepartmentsQuery.ts";
import {GET_POSITIONS_QUERY} from "@widgets/users/api/getPositionsQuery.ts";
import {GET_USER_BY_ID_QUERY} from "@widgets/users/api/getUserByIdQuery.ts";
import {UPDATE_USER_MUTATION} from "@widgets/users/api/updateUserMutation.ts";
import {UPDATE_PROFILE_MUTATION} from "@widgets/users/api/updateProfileMutation.ts";

const UpdateUserDialog = (props) => {

    const [updateUser] = useMutation(UPDATE_USER_MUTATION);
    const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION);


    const [firstNameInputValue, setFirstNameInputValue] = useState('');
    const [lastNameInputValue, setLastNameInputValue] = useState('');
    const [departmentInputValue, setDepartmentInputValue] = useState('');
    const [positionInputValue, setPositionInputValue] = useState('');
    const [passwordInputValue, setPasswordInputValue] = useState('**********');
    const [emailInputValue, setEmailInputValue] = useState('');
    const [roleInputValue, setRoleInputValue] = useState('');

    const [isUpdateDisabled, setIsUpdateDisabled] = useState(true)

    const currentUserId = localStorage.getItem('currentUserId');


    const {loading, error, data, refetch} = useQuery(GET_USER_BY_ID_QUERY, {
        variables: {id: currentUserId},
        skip: !currentUserId,
        notifyOnNetworkStatusChange: false
    });

    const user = data?.user;
    const profile = user?.profile;

    const firstName = profile?.first_name || '';
    const lastName = profile?.last_name || '';
    const department = user?.department_name || '';
    const position = user?.position_name || '';
    const email = user?.email || '';
    const role = user?.role || '';

    useEffect(() => {
        if (!user) return;

        setFirstNameInputValue(firstName);
        setLastNameInputValue(lastName);
        setDepartmentInputValue(department);
        setPositionInputValue(position);
        setEmailInputValue(email);
        setRoleInputValue(role);
        // setPositionInputValue(password);

    }, [user, firstName, lastName, department, position, email, role]);

    useEffect(() => {
        if (!user) return;

        const firstNameChanged = firstNameInputValue !== (profile?.first_name || '');
        const lastNameChanged = lastNameInputValue !== (profile?.last_name || '');
        const departmentChanged = departmentInputValue !== (user?.department_name || '');
        const positionChanged = positionInputValue !== (user?.position_name || '');

        setIsUpdateDisabled(!(firstNameChanged || lastNameChanged || departmentChanged || positionChanged));
    }, [firstNameInputValue, lastNameInputValue, departmentInputValue, positionInputValue, profile, user]);


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


    const {loading: positionsLoading, error: positionsError, data: positionsData} = useQuery(GET_POSITIONS_QUERY);
    let positionsDataFromServer = positionsData?.positions ?? [];
    positionsDataFromServer = [{name: "", id: '0'}, ...positionsDataFromServer]


    let positions = null;
    if (positionsData) {
        positions = positionsData.positions.map((position) => position.name)
        positions.unshift('No position');
    }

    function getDepartmentIdByName(departments, name) {
        const dept = departments.find(d => d.name === name);
        return dept ? dept.id : null;
    }

    function getPositionIdByName(positions, name) {
        const position = positions.find(p => p.name === name);
        return position ? position.id : null;
    }

    const onCancelClick = () => {
        props.handleDialogClose();
    }

    const onUpdateButtonClick = async () => {

        const departmentId = getDepartmentIdByName(departmentsDataFromServer, departmentInputValue)?.toString()
        const positionId = getPositionIdByName(positionsDataFromServer, positionInputValue)?.toString()

        await updateUser({
            variables: {
                user: {
                    userId: currentUserId.toString(),
                    departmentId: departmentId.toString(),
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
        props.handleDialogClose();
    };


    return (
        <div className={styles.container}>
            <TextField
                className={styles.input}
                label="Email"
                variant="outlined"
                value={emailInputValue}
                disabled={true}
                onChange={e => setEmailInputValue(e.target.value)}
                InputLabelProps={{shrink: emailInputValue !== ''}}
            />
            <TextField
                className={styles.input}
                label="Password"
                variant="outlined"
                value={passwordInputValue}
                disabled={true}
                onChange={e => setPasswordInputValue(e.target.value)}
                InputLabelProps={{shrink: passwordInputValue !== ''}}
            />

            <TextField
                className={styles.input}
                label="First Name"
                variant="outlined"
                value={firstNameInputValue}
                onChange={e => setFirstNameInputValue(e.target.value)}
                InputLabelProps={{shrink: firstNameInputValue !== ''}}
            />


            <TextField
                className={styles.input}
                label="Last Name"
                variant="outlined"
                value={lastNameInputValue}
                onChange={e => setLastNameInputValue(e.target.value)}
                InputLabelProps={{shrink: lastNameInputValue !== ''}}
            />


            <TextField
                className={styles.input}
                label="Department"
                variant="outlined"
                select
                value={departmentInputValue}
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

            <TextField
                className={styles.input}
                label="Role"
                variant="outlined"
                value={roleInputValue}
                disabled={true}
                onChange={e => setRoleInputValue(e.target.value)}
                InputLabelProps={{shrink: roleInputValue !== ''}}
            />

            <div className={styles.input}></div>


            <div className={styles.buttonsContainer}>
                <Button
                    variant="contained"
                    onClick={onCancelClick}
                    className={styles.cancelButton}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={onUpdateButtonClick}
                    disabled={isUpdateDisabled}
                    className={styles.updateButton}
                >
                    Update
                </Button>
            </div>
        </div>
    );
}


    //original
//     return (
//         <div>
//             <TextField
//                 className={styles.input}
//                 label="Email"
//                 variant="outlined"
//                 value={emailInputValue}
//                 disabled={true}
//                 onChange={e => setEmailInputValue(e.target.value)}
//                 InputLabelProps={{shrink: emailInputValue !== ''}}
//             />
//             <TextField
//                 className={styles.input}
//                 label="Password"
//                 variant="outlined"
//                 value={passwordInputValue}
//                 disabled={true}
//                 onChange={e => setPasswordInputValue(e.target.value)}
//                 InputLabelProps={{shrink: passwordInputValue !== ''}}
//             />
//
//             <TextField
//                 className={styles.input}
//                 label="First Name"
//                 variant="outlined"
//                 value={firstNameInputValue}
//                 onChange={e => setFirstNameInputValue(e.target.value)}
//                 InputLabelProps={{shrink: firstNameInputValue !== ''}}
//             />
//
//
//             <TextField
//                 className={styles.input}
//                 label="Last Name"
//                 variant="outlined"
//                 value={lastNameInputValue}
//                 onChange={e => setLastNameInputValue(e.target.value)}
//                 InputLabelProps={{shrink: lastNameInputValue !== ''}}
//             />
//
//
//             <TextField
//                 className={styles.input}
//                 label="Department"
//                 variant="outlined"
//                 select
//                 value={departmentInputValue}
//                 onChange={onDepartmentChange}
//             >
//                 {departments !== null ?
//
//                     departments.map((department) => (
//                         <MenuItem key={department} value={department}>
//                             {department}
//                         </MenuItem>
//                     )) : null
//                 }
//             </TextField>
//
//
//             <TextField
//                 className={styles.input}
//                 label="Position"
//                 variant="outlined"
//                 select
//                 value={positionInputValue}
//                 onChange={onPositionChange}
//             >
//                 {positions !== null ?
//                     positions.map((position) => (
//                         <MenuItem key={position} value={position}>
//                             {position}
//                         </MenuItem>
//                     )) : null
//                 }
//             </TextField>
//
//             <TextField
//                 className={styles.input}
//                 label="Role"
//                 variant="outlined"
//                 value={roleInputValue}
//                 disabled={true}
//                 onChange={e => setRoleInputValue(e.target.value)}
//                 InputLabelProps={{shrink: roleInputValue !== ''}}
//             />
//
//             <Button variant="contained" onClick={onCancelClick}>Cancel</Button>
//             <Button variant="contained" onClick={onUpdateButtonClick} disabled={isUpdateDisabled}>Update</Button>
//         </div>
//     );
// };

export default UpdateUserDialog;
import React, {useState, useEffect}from 'react'
import { useSelector,useDispatch } from 'react-redux';
import LeaveRequistion from '../Leave/LeaveRequistion';
import LeaveApproval from '../LeaveApproval/LeaveApproval';
import { useApprovals } from '../../Vendors/VendorApprovals/useApprovals';
import { GetLocalStorage } from '../../../../../utils/functions/GetLocalStorage';
import LeaveApprovalHOD from '../LeaveApprovalHOD/LeaveApprovalHOD';

const LeaveMain = () => {
    const [sort, setSort] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState(0);
    const { openModal, closeModal } = useApprovals({});
    const [userRole, setUserRole] = useState('')
     //console.log(currentUserPermission)

  


} 

export default LeaveMain

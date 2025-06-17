import { useEffect, useState } from "react";
import axiosClient from "../../../axiosClient";

export default function useAttendanceStatusAdmin(){
  const [staff, setStaff] = useState([]);

    useEffect(() => {
    axiosClient.get('/admin/staff-attendance-status')
      .then(res => setStaff(res.data));
  }, []);

  return {
    staff
  }
}

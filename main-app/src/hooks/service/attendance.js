import axiosClient from "../../axiosClient"

export default function useAttendanceStaff(){
const handleTimeInClick = async () => {
  try {
    const res = await axiosClient.post('/attendance/time-in');
    alert(res.message || "Time-in successful!");
  } catch (error) {
    if (error.response && error.response.status === 409) {
      alert(error.response.data.error);
    } else {
      alert("Time-in failed!");
    }
  }
};

const handleTimeOutClick = async () => {
  try {
    const res = await axiosClient.post('attendance/time-out');
    alert(res.message || "Time-out successful!");
  }catch(error) {
    if (error.response && error.response.status === 409) {
      alert(error.response.data.error);
    } else {
      alert("Time-out failed!");
    }
  }
}

return {
  handleTimeInClick,
  handleTimeOutClick
};
}

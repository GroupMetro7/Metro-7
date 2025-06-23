import { useEffect, useState } from "react";
import { useStateContext } from "../../../Contexts/ContextProvider";

export default function useModifyData() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
  });
  const { user, setUser } = useStateContext();

    useEffect(() => {
      if (user) {
        setFormData({
          firstname: user.firstname || "",
          lastname: user.lastname || "",
          email: user.email || "",
          contact: user.contact || "",
        });
      }
    }, [user]);

      const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    return {
      formData,
      user,
      setUser,
      handleInputChange
    }
}

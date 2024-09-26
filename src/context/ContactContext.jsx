import React, { createContext, useContext, useEffect,useState } from 'react'
import contactList from "../../db.json"
///import listContact from "../constants/listContact"
  const ContactContext=createContext();
function ContactProvider({children}) {
     const [contacts, setContacts] = useState([]);
     useEffect(()=>{
         setContacts(contactList)
     },[])
      // useEffect(() => {
      //   const fetchContacts = async () => {
      //     try {
      //       const response = await axios.get("http://localhost:3010");
            
      //       setContacts(response.data); // فقط داده‌ها را ذخیره کنید
      //     } catch (error) {
      //       console.log("Error fetching contacts:", error.message); // پیام خطای دقیق‌تر
      //     }
      //   };

      //   fetchContacts();
      // }, []);

      console.log(contacts);
    //  useEffect(()=>{
    //     const fetchContacts = async () => {
    //       try {
    //         const response = await axios.get("http://localhost:3010");
    //         setContacts(response.data);
    //       } catch (error) {
    //         console.log(error.message);
    //       }
    //     };

    //     fetchContacts();
    //  },[])
     //console.log(contacts)
  return (
   <ContactContext.Provider value={contacts}>
    {children}
   </ContactContext.Provider>
    
  )
}
const useContacts = () => {
  const contacts = useContext(ContactContext);
  return contacts;
};


export default ContactProvider
export {useContacts}

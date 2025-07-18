export { useStateContext } from '../Contexts/ContextProvider'

export { default as usePageTitle } from '../Hooks/Universal/Page_Title'
export { default as useBodyAddClass } from '../Hooks/Universal/Body_Class'
export { default as useScreenWidth } from '../Hooks/Universal/Screen_Width'

export { default as useAuthentication } from '../Hooks/Users/Authentication'
export { default as useRegisterUser } from '../Hooks/Users/Register_User'
export { default as useFetchEmailUser } from '../Hooks/Users/Fetch_Email_User'
export { default as useChangePassUser } from '../Hooks/Users/Change_Pass'

export { default as useFetchProduct } from '../Hooks/service/fetchProducts'
export { default as useCreateOrder } from '../Hooks/orders/createOrderCustomer'
export { default as useCreateReservation } from '../Hooks/customer/reservation/createReservation'
export { default as useFetchOrder } from '../Hooks/Universal/fetchProducts'

export { default as useOCRReceipt } from '../Hooks/Universal/OCR'

export { default as useClockText } from '../Hooks/UI Display/Clock_Text'
export { default as useDateFormat } from '../Hooks/UI Display/Date_Fetch_Format'
export { default as useTimeFormat } from '../Hooks/UI Display/Time_Fetch_Format'
export { default as useDateTimeFormat } from '../Hooks/UI Display/DateTime_Fetch_Format'

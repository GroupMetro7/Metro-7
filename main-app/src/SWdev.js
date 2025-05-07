export default function SWdev()
{
    let swUrl= `${import.meta.env.PUBLIC_URL}/sw.js`
    navigator.serviceWorker.register("/sw.js").then((response)=>{
        console.warn("response",response)
    })
    
}
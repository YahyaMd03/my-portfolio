export function GET(){
    console.log("API check route accessed");
    return new Response('API is working')
}
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { auth,db } from 'lib/firebase';
import { useEffect, useState } from 'react';
import { DASHBOARD, LOGIN } from 'lib/routes';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { setDoc,doc, getDoc } from 'firebase/firestore';
import isUserNameExist from 'utils/isUsernameExist';
export function useAuth() {
   
    const [ authUser, authLoading, error ] = useAuthState(auth);
    const [user,setUser]=useState(null);
    const [isLoading,setLoading]=useState(true);

    useEffect(()=>{
        async function fetchData(){
            setLoading(true);
            const ref=doc(db,'users',authUser.uid);
            const docSnap=await getDoc(ref);
            setUser(docSnap.data())
            setLoading(false);
        }

        if(!authLoading){
            if(authUser){
                fetchData();
            }else{
                setLoading(false); //not signed in
            }
        }


    },[authLoading])

    return { user, isLoading,error};
}

export function useLogin(){
    const [isLoading,setLoading]=useState(false);
    const toast=useToast();
    const navigate=useNavigate();
    async function login({email,password,redirectTo=DASHBOARD}){
        setLoading(true);
        try{
            await signInWithEmailAndPassword(auth,email,password);
            toast({
                title:'You are Logged in Successfully',
                status:'success',
                isClosable:true,
                position:'top',
                duration:5000,
            }) ;    
           
            navigate(redirectTo)                          
        }
        catch(error){
            toast({
                title:'Some Error Occured',
                description:error.message,
                status:'error',
                isClosable:true,
                position:'top',
                duration:5000,
            });
            setLoading(false)
            return false;//login failed
        }
        setLoading(false);
        return true; // loggin successfully
    }
    return {login,isLoading}
}

export function useRegister(){
    const [isLoading,setLoading]=useState(false);
    const toast=useToast();
    const navigate=useNavigate();
    async function register({username,email,password,redirectTo=DASHBOARD}){
         setLoading(true);

         const usernameExists=await isUserNameExist(username);
            if(usernameExists){
                toast({
                    title:'Username already Exists',
                    status:'error',
                    isClosable:true,
                    position:'top',
                    duration:5000,
                })
                setLoading(false);
            }else{
                try{

                    const res=await createUserWithEmailAndPassword(auth,email,password);
                    await setDoc(doc(db,'users',res.user.uid),{
                        id: res.user.uid,
                        username:username.toLowerCase(),
                        avatar:'',
                        date:Date.now(),
                    })
                   toast({
                    title:'Account Created',
                    status:'success',
                    isClosable:true,
                    position:'top',
                    duration:5000,
                   });
                 navigate(redirectTo);
                }catch(error){
                    toast({
                        title:'Signing up Failed',
                        status:'error',
                        isClosable:true,
                        position:'top',
                        duration:5000,
                       });
                } finally{
                    setLoading(false);
                }
            }
            setLoading(false);
    }
    return {register,isLoading};
}



export function useLogout(){
    const [signOut,isLoading,error]=useSignOut(auth);
    const navigate=useNavigate();
    const toast=useToast();


    async function logout(){
        if(await signOut()){
            toast({
                title:'Succssfully logged out',
                status:'success',
                isClosable:'true',
                position:'top',
                duration:5000
            })
            navigate(LOGIN);
        }
        else{
            console.log(error);
        }
    }
    return {logout,isLoading};
}
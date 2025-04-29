import { useState,useEffect } from "react"
import axios from "axios"


const Profile = () =>{
    const [profile,setProfile] = useState('')
    const [currentprofile,setCurrentprofile] = useState('')
    const [loading,setLoading] = useState('')
    const token = localStorage.getItem('access')
    
}
 
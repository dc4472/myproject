import React from "react";
import { useState , useEffect } from "react";

const Confirmation = props =>{

  const [bills, setBills]=useState([])

  const fetchbills = () =>{

    fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/form`).then(response => response.json()).then((json) => setBills(json))

  }

  useEffect(() => {
    fetchbills()
  },[])

  




}

export default Confirmation
const express = require('express')
const router = new express.Router()
const YelpKey = require('../secrets')
const ExpressError = require("../ExpressError");
const axios = require ('axios')

 router.get('/yo', async (req, resp, next)=>{
    try{
    
    return resp.json({message : 'working'})
    
    }catch(err){
        return next(err)
    }
})

//Home courasel data
router.get('/gen', async (req, resp, next)=>{
    try{
    let res = await axios.get(`https://api.yelp.com/v3/events?&sort_on=popularity&start_date<=${+ new Date}e&limit=10`,{
        headers:{
        Authorization: `Bearer _BONcCSprVYtcvnpOGySFVR017XHLeaVtmJOWmDPw9mIXMY7Tio6Rs5eDSLcP-hOGBjnfvCli8S76dcBcO-hJ05wZ9-JD7iiAznSIlMZBAqWNNVW58STi0rKszJFX3Yx`
        }
    })
    let resarr= res.data.events

    return resp.json(resarr)
    }catch(err){
        return next(err)
    }
})

//data by category post request send id
router.post('/category', async (req, resp, next)=>{
    let categoryId = req.body.cat

    const res = await axios.get(`https://api.yelp.com/v3/events?categories=${categoryId}&start_date<=${+ new Date}&sort_on=time_start&limit=10`,{
        headers:{
        Authorization: `Bearer _BONcCSprVYtcvnpOGySFVR017XHLeaVtmJOWmDPw9mIXMY7Tio6Rs5eDSLcP-hOGBjnfvCli8S76dcBcO-hJ05wZ9-JD7iiAznSIlMZBAqWNNVW58STi0rKszJFX3Yx`
        }
    })
    const resarr= res.data.events

    return resp.json({categoryId:categoryId,results :resarr})
})

//events by Id
router.post('/event', async (req, resp, next)=>{
    let eventId = req.body.id

    const res = await axios.get(`https://api.yelp.com/v3/events/${eventId}`,{
        headers:{
        Authorization: `Bearer _BONcCSprVYtcvnpOGySFVR017XHLeaVtmJOWmDPw9mIXMY7Tio6Rs5eDSLcP-hOGBjnfvCli8S76dcBcO-hJ05wZ9-JD7iiAznSIlMZBAqWNNVW58STi0rKszJFX3Yx`
    
        }
    })
    const resarr= res.data

    return resp.json({categoryId:eventId,results :resarr})
})

//search res
router.post('/result', async (req, resp, next)=>{
    let term = req.body.term
    let location = req.body.location

    const res = await axios.get(`https://api.yelp.com/v3/events?categories=${term}&location=${location}&start_date<=${+ new Date}&sort_on=time_start&radius=40000&limit=25`,{
    headers:{
    Authorization: `Bearer _BONcCSprVYtcvnpOGySFVR017XHLeaVtmJOWmDPw9mIXMY7Tio6Rs5eDSLcP-hOGBjnfvCli8S76dcBcO-hJ05wZ9-JD7iiAznSIlMZBAqWNNVW58STi0rKszJFX3Yx`
    }
    })

    const resarr= res.data.events

    return resp.json(resarr)
})

//nearby buisenesses 
router.post('/suggest', async (req, resp, next)=>{
    let lat = req.body.lat
    let lon = req.body.lon

    console.log (lat , lon, '------------------------------------------')

    const res = await axios.get(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}&radius=40000&attributes=hot_and_new&limit=15`,{
    headers:{
    Authorization: `Bearer _BONcCSprVYtcvnpOGySFVR017XHLeaVtmJOWmDPw9mIXMY7Tio6Rs5eDSLcP-hOGBjnfvCli8S76dcBcO-hJ05wZ9-JD7iiAznSIlMZBAqWNNVW58STi0rKszJFX3Yx`
    }
    })
 
  const resarr= res.data.businesses

    return resp.json(resarr)
})

// featured event
router.post('/feature', async (req, resp, next)=>{
    let location = req.body.location

    const res = await axios.get(`https://api.yelp.com/v3/events/featured?location=${location}`,{
    headers:{
    Authorization: `Bearer _BONcCSprVYtcvnpOGySFVR017XHLeaVtmJOWmDPw9mIXMY7Tio6Rs5eDSLcP-hOGBjnfvCli8S76dcBcO-hJ05wZ9-JD7iiAznSIlMZBAqWNNVW58STi0rKszJFX3Yx`
    }
    })
 
  const resarr= res.data

    return resp.json(resarr)
})

module.exports = router
const { default: axios } = require('axios')
const express = require('express')
const router = express.Router()

router.post('/send-otp', async(req, res)=>{
    try {
        console.log("Yes")
        const {mobileNumber} = req.body
        const response  = await axios.post('https://cpaas.messagecentral.com/verification/v3/send',
            null,
            {
                params: {
                    countryCode: 91,
                    customerId: "C-41E4C96FEE3046C",
                    flowType: "SMS",
                    mobileNumber: mobileNumber
                },
                headers: {
                    authToken :"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLTQxRTRDOTZGRUUzMDQ2QyIsImlhdCI6MTc0MDA0OTkzMSwiZXhwIjoxODk3NzI5OTMxfQ.ifUqp2u3j8vhRtWEBcnkouBO-wEPaKJApumr4pCAIcblNdL8Q3P7rk70qCAgmrA0RmwcqnbhlAq73-vHEjmg9g"
                }
            }
        )

        if (response.data.responseCode === 200){
            res.status(200).send({
                verificationId: response.data.data.verificationId
            })
        }

        console.log(response.data)
        
    } catch (error) {
        console.log(error)
    }
})




module.exports = router
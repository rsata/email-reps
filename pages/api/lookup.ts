// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from 'axios'

export default async (req, res) => {
  try {
    const response = await axios({
      url: 'https://www.googleapis.com/civicinfo/v2/representatives',
      method: 'get',
      headers: {
        'X-Goog-Api-Key': process.env.CIVIC_API_KEY
      },
      params: {
        levels: ['country', 'regional', 'locality'],
        // roles: ['deputyHeadOfGovernment','executiveCouncil','governmentOfficer','highestCourtJudge','judge','legislatorLowerBody','legislatorUpperBody','schoolBoard','specialPurposeOfficer'],
        address: req.body
      }
    })
    res.statusCode = 200
    res.json(response.data)
  }  
  catch (err) {
    res.statusCode = 400
    res.json({...err.response.data.error})
  }
}

var express = require('express');
var router = express.Router();
var models = require('../models')
var { Response } = require('../helpers/util')
const { Op } = require('sequelize')


router.get('/', async function (req, res, next) {
  try {
    const { name, phone } = req.query

    const page = parseInt(req.query.page) || 1
    const limit = 8
    const offset = (page - 1) * limit


    const total = await models.User.count()
    const totalPages = Math.ceil(total / limit)
    
    if (name && phone) {
      const getUser = await models.User.findAll({
        where: {
          [Op.and]: [
            {
              name: {
                [Op.iLike]: '%' + name + '%'
              }
            },
            {
              phone: {
                [Op.iLike]: '%' + phone + '%'
              }
            }
          ]
        },
        limit,
        offset,
        order: [
          ["id", "desc"]
        ],
      })
      res.json(new Response({
         contacts: getUser,
          page, 
          totalPages, 
          offset 
        }))
    } else if (name) {
      const getUser = await models.User.findAll({
        where: {
          name: {
            [Op.iLike]: '%' + name + '%'
          }
        },
        limit,
        offset,
        order: [
          ["id", "desc"]
        ],
      })
      res.json(new Response({ 
        contacts: getUser, 
        page, 
        totalPages, 
        offset 
      }))
    } else if (phone) {
      const getUser = await models.User.findAll({
        where: {
          phone: {
            [Op.iLike]: '%' + phone + '%'
          }
        },
        limit,
        offset,
        order: [
          ["id", "desc"]
        ],
      })
      res.json(new Response({
         contacts: getUser, 
         page, 
         totalPages, 
         offset 
        }))
    } else {
      const getUser = await models.User.findAll({
        order: [
          ["id", "desc"]
        ],
        limit,
        offset
      })
      res.json(new Response({ 
        contacts: getUser, 
        page, 
        totalPages, 
        offset 
      }))
    }
  } catch (error) {
    res.status(500).json(new Response(error, false))
  }
});


  // /* GET users listing. */
  // router.get('/', async (req, res, next) => {
  //   try {
  //     const { page, name, phone } = req.query
  //     const limit = 8
  //     const offset = (page - 1) * limit
  //     const total = await models.User.count()
  //     const totalPages = Math.ceil(total / limit)
     
    

  //     if (name && phone) {
  //       const users = await models.User.findAll({
  //         limit,
  //         offset,
  //         where: {
  //           [Op.or]: [
  //             {
  //               name: {
  //                 [Op.iLike]: `%${name}%`
  //               }
  //             },
  //             {
  //               phone: {
  //                 [Op.iLike]: `%${phone}%`
  //               }
  //             }
  //           ]
  //         },
  //         order: [
  //           ['id', 'asc']
  //         ]
  //       })

  //       res.json(new Response({
  //         users,
  //         page: Number(page),
  //         totalPages
  //       }))

  //     } else if (name) {
  //       const users = await models.User.findAll({
  //         limit,
  //         offset,
  //         where: {
  //           [Op.and]: [
  //             {
  //               name: {
  //                 [Op.iLike]: `%${name}%`
  //               }
  //             }
  //           ]
  //         },
  //         order: [
  //           ['id', 'asc']
  //         ]
  //       })


  //       res.json(new Response({
  //         users,
  //         page: Number(page),
  //          totalPages
  //       }))
  //     } else if (phone) {
  //       const users = await models.User.findAll({
  //         limit,
  //         offset,
  //         where: {
  //           [Op.and]: [
  //             {
  //               phone: {
  //                 [Op.iLike]: `%${phone}%`
  //               }
  //             }
  //           ]
  //         },
  //         order: [
  //           ['id', 'asc']
  //         ]
  //       })  
     
  //       res.json(new Response({
  //         users,
  //         page: Number(page),
  //         totalPages
  //       }))

  //     } else {
  //       const users = await models.User.findAll({
  //         limit,
  //         offset,
  //         order: [
  //           ['id', 'asc']
  //         ]
  //       })


  //       res.json(new Response({
  //         users,
  //          page: Number(page),
  //          totalPages
  //       }))
  //       // console.log(users,'users');
  //       // console.log(page,'page')
  //       // console.log(offset,'offset');
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     res.status(500).json(new Response(error, false))
  //   }
  // });


  router.post('/', async function (req, res, next) {
    try {
      const user = await models.User.create(req.body)
      res.json(new Response(user))
    } catch (err) {
      res.status(500).json(new Response(err, false))
    }
  });

  router.put('/:id', async function (req, res, next) {
    try {
      const user = await models.User.update(req.body, {
        where: {
          id: req.params.id
        },
        returning: true,
        plain: true
      })
      res.json(new Response(user[1]))
    } catch (err) {
      res.status(500).json(new Response(err, false))
    }
  });

  router.delete('/:id', async function (req, res, next) {
    try {
      const user = await models.User.destroy({
        where: {
          id: req.params.id
        }
      })
      res.json(new Response(user))
    } catch (err) {
      res.status(500).json(new Response(err, false))
    }
  });

  module.exports = router;

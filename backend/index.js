const express = require('express'),
    app = express(),
    passport = require('passport'),
    port = process.env.PORT || 80,
    cors = require('cors'),
    cookie = require('cookie')

const bcrypt = require('bcrypt')

const db = require('./database.js')
let users = db.users

require('./passport.js')

const router = require('express').Router(),
    jwt = require('jsonwebtoken')

app.use('/api', router)
router.use(cors({ origin: 'http://localhost:3000', credentials: true }))
// router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

let products = {
    list: [
        { id: 1, name: 'Viper', position: 'Controller', skill: 'Q - POISON CLOUD,E - TOXIC SCREEN,C - SNAKE BITE,X - VIPERS PIT', imageurl: "https://i.ytimg.com/vi/WuZGmKZuoaI/maxresdefault.jpg" },
        { id: 2, name: 'Killjoy', position: 'Sentinel', skill: 'Q - ALARMBOT,E - TURRET,C - NANOSWARM,X - LOCKDOWN', imageurl: "https://i.ytimg.com/vi/gFcm2D8Gc4g/maxresdefault.jpg" },
        { id: 3, name: 'Reyna', position: 'Duelist', skill: 'Q - DEVOUR,E - DISMISS,C - LEER,X - EMPRESS', imageurl: "https://cdn.oneesports.co.th/cdn-data/wp-content/uploads/sites/3/2020/06/atey-ghailan-gold20-rey-reyna-golden-moment-thumbnail-1.jpg" },
        { id: 4, name: 'Breach', position: 'Initiator', skill: 'Q - FLASHPOINT,E - FAULT LINE,C - AFTERSHOCK,X - ROLLING THUNDER', imageurl: "https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2020/10/30/odxgos7ooyc39zura8wn/valorant-operator-breach" },
        { id: 5, name: 'Sage', position: 'Sentinel', skill: 'Q - SLOW ORB,E - HEALING ORB,C - BARRIER ORB,X - RESURRECTION', imageurl: "https://cdn.realsport101.com/images/ncavvykf/gfinityesports/7c8ed407ca89f6c14ac8d9bc80ac5f0c84d178fc-1920x1080.jpg?rect=1,0,1919,1080&w=700&h=394" },
        { id: 6, name: 'Sova', position: 'Initiato', skill: 'Q - SHOCK BOLT,E - RECON BOLT,C - OWL DRONE,X - HUNTER’S FURY', imageurl: "https://img.4gamers.com.tw/news-image/2cf9806b-5ead-4bcb-b4c3-1efc4ac37b10.jpg" },
        { id: 7, name: 'Kayo', position: 'Initiato', skill: 'Q - FLASH/DRIVE,E - ZERO/POINT,C - FRAG/MENT,X - NULL/CMD', imageurl: "https://i.ytimg.com/vi/eU1l7eBy2_Y/maxresdefault.jpg" },
        { id: 8, name: 'Jett', position: 'Duelist', skill: 'Q - UPDRAFT,E - TAILWIND,C - CLOUDBURST,X - BLADE STORM', imageurl: "https://i.ytimg.com/vi/FHEHDHSiUfM/maxresdefault.jpg" },
        { id: 9, name: 'Skye', position: 'Initiato', skill: 'Q - TRAILBLAZER,E - GUIDING LIGHT,C - REGROWTH,X - SEEKERS', imageurl: "https://i.ytimg.com/vi/C3QTyMXi-WE/maxresdefault.jpg" },
        { id: 10, name: 'Neon', position: 'Duelist', skill: 'Q - RELAY BOLT,E - HIGH GEAR,C - FAST LANE,X - OVERDRIVE', imageurl: "https://www.dexerto.com/wp-content/uploads/2022/01/10/valorant-neon-guide-abilities-how-to-play-tips-tricks.jpg" },
        { id: 11, name: 'Yoru', position: 'Duelist', skill: 'Q - BLINDSIDE,E - GATECRASH,C - FAKEOUT,X - DIMENSIONAL DRIFT', imageurl: "https://i.ytimg.com/vi/GdOEQv-zQVw/maxresdefault.jpg" },
        { id: 12, name: 'Brimstone', position: 'Controller', skill: 'Q - INCENDIARY,E - SKY SMOKE,C - STIM BEACON,X - ORBITAL STRIKE', imageurl: "https://thumbor.4gamers.com.tw/zbQUYZU_nWFsHXPmlBPFalBZ3iY=/800x0/filters:extract_cover():no_upscale():quality(80):format(jpeg):background_color(FFFFFF)/https%3A%2F%2Fimg.4gamers.com.tw%2Fckfinder-th%2Ffiles%2F144651-brimstone-amp_main_media_schema-3.png%3FversionId%3DUgikAz8lgWUUI6g72bZ0kqZE0I_LRAY9" },

    ]
}
let income = 0

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log('Login: ', req.body, user, err, info)
        if (err) return next(err)
        if (user) {
            const token = jwt.sign(user, db.SECRET, {
                expiresIn: '1d'
            })
            // req.cookie.token = token
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    maxAge: 60 * 60,
                    sameSite: "strict",
                    path: "/",
                })
            );
            res.statusCode = 200
            return res.json({ user, token })
        } else
            return res.status(422).json(info)
    })(req, res, next)
})

router.get('/logout', (req, res) => {
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: -1,
            sameSite: "strict",
            path: "/",
        })
    );
    res.statusCode = 200
    return res.json({ message: 'Logout successful' })
})

/* GET user profile. */
router.get('/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.send(req.user)
    });

;

router.route('/products')
    .get((req, res) => res.json(products.list))
    .post((req, res) => {
        console.log(req.body)
        let newproduct = {}
        newproduct.id = (products.list.length) ? products.list[products.list.length - 1].id + 1 : 1
        newproduct.name = req.body.name
        newproduct.position = req.body.position
        newproduct.skill = req.body.skill
        newproduct.imageurl = req.body.imageurl
        products = { "list": [...products.list, newproduct] }
        res.json(products.list)
    })

router.route('/products/:product_id')
    .get((req, res) => {
        const product_id = req.params.product_id
        const id = products.list.findIndex(item => +item.id === +product_id)
        res.json(products.list[id])
    })
    .put((req, res) => {
        const product_id = req.params.product_id
        const id = products.list.findIndex(item => +item.id === +product_id)
        products.list[id].id = req.body.id
        products.list[id].name = req.body.name
        products.list[id].position = req.body.position
        products.list[id].skill = req.body.skill
        products.list[id].imageurl = req.body.imageurl
        res.json(products.list)
    })
    .delete((req, res) => {
        const product_id = req.params.product_id
        products.list = products.list.filter(item => +item.id !== +product_id)
        res.json(products.list)
    })



router.route('/income')
    .get((req, res) => res.json(income))



router.route('/purchase/:product_id')
    .delete((req, res) => {
        const product_id = req.params.product_id
        const id = products.list.findIndex(item => +item.id === +product_id)
        console.log('productID: ', product_id, 'ID: ', id)
        if (id !== -1) {
            income += products.list[id].price
            products.list = products.list.filter(item => +item.id !== +product_id)
            res.json(products.list)
        }
        else {
            res.send('Not found')

        }
    })

router.post('/register',
    async (req, res) => {
        try {
            const SALT_ROUND = 10
            const { username, email, password } = req.body
            if (!username || !email || !password)
                return res.json({ message: "Cannot register with empty string" })
            if (db.checkExistingUser(username) !== db.NOT_FOUND)
                return res.json({ message: "Duplicated user" })

            let id = (users.users.length) ? users.users[users.users.length - 1].id + 1 : 1
            hash = await bcrypt.hash(password, SALT_ROUND)
            users.users.push({ id, username, password: hash, email })
            res.status(200).json({ message: "Register success" })
        } catch {
            res.status(422).json({ message: "Cannot register" })
        }
    })

router.put('/reproducts/:product_id',
    async (req, res) => {
        const product_id = req.params.product_id
        const id = products.list.findIndex(item => +item.id === +product_id)
        if (products.list[id].position > 0)
            products.list[id].position--
        res.json(req.products)

    })

router.put('/addproduct/:product_id',
    async (req, res) => {
        const product_id = req.params.product_id
        const id = products.list.findIndex(item => +item.id === +product_id)
        products.list[id].position++
        res.json(req.products)
    })


router.get('/alluser', (req, res) => res.json(db.users.users))

router.get('/', (req, res, next) => {
    res.send('Respond without authentication');
});

// Error Handler
app.use((err, req, res, next) => {
    let statusCode = err.status || 500
    res.status(statusCode);
    res.json({
        error: {
            status: statusCode,
            message: err.message,
        }
    });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`))
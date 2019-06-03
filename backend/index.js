var express = require("express")
var app = express()
var cors = require("cors")
const MongoClient = require("mongodb").MongoClient
app.use(cors({ credentials: true, origin: "http://localhost:8080" }))
var bodyParser = require("body-parser")
var url = "mongodb://admin:admin123@ds123635.mlab.com:23635/bouquetex"
var dbs = undefined
var ObjectID = require("mongodb").ObjectID
// var ObjectID = require("mongodb").ObjectID
MongoClient.connect(
  url,
  { useNewUrlParser: true },
  { useMongoClient: true },
  (err, db) => {
    if (err) throw err
    dbs = db.db("bouquetex")
  }
)

var generateId = () => {
  return Math.floor(Math.random() * 10000000000)
}
var itemData = []
var fs = require("fs")
var multer = require("multer")
app.use(cors())
var upload = multer({ dest: __dirname + "/images/" })
// app.use(express.static(`${__dirname}/../build`))
// app.use(express.static(__dirname + "/images"))
console.log("dir name: ", __dirname)

app.post("/api/addCloth", upload.single("product-image"), (req, res) => {
  console.log("********************* Add Image  *****************")
  console.log(req.file)
  console.log("new file location", req.file.path)
  var extension = req.file.originalname.split(".").pop()
  fs.rename(req.file.path, req.file.path + "." + extension, () => {})
  console.log("body", req.body)
  var itemToStore = {
    path: "/" + req.file.filename + "." + extension,
    typeOfCloth: req.body.typeOfCloth,
    costPerMeter: req.body.costPerMeter
  }
  console.log("we are adding", itemToStore)
  itemData.push(itemToStore)
  dbs.collection("cloth").insertOne(itemToStore, function(err) {
    if (err) return err
  })
  console.log("updated itemData:", itemData)
  res.send(JSON.stringify(itemToStore))
})
app.post("/api/addBaradi", upload.single("product-image"), (req, res) => {
  console.log("********************* Add baradi  *****************")
  console.log(req.file)
  console.log("new file location", req.file.path)
  var extension = req.file.originalname.split(".").pop()
  fs.rename(req.file.path, req.file.path + "." + extension, () => {})
  console.log("body", req.body)
  var itemToStore = {
    path: "/" + req.file.filename + "." + extension,
    costPerMeter: req.body.costPerMeter
  }
  console.log("we are adding", itemToStore)
  itemData.push(itemToStore)
  dbs.collection("baradi").insertOne(itemToStore, function(err) {
    if (err) return err
  })
  console.log("updated itemData:", itemData)
  res.send(JSON.stringify(itemToStore))
})
app.post("/api/addSalon", upload.single("product-image"), (req, res) => {
  console.log("********************* Add salon  *****************")
  console.log(req.file)
  console.log("new file location", req.file.path)
  var extension = req.file.originalname.split(".").pop()
  fs.rename(req.file.path, req.file.path + "." + extension, () => {})
  console.log("body", req.body)
  var itemToStore = {
    path: "/" + req.file.filename + "." + extension,
    costPerMeter: req.body.costPerMeter
  }
  console.log("we are adding", itemToStore)
  itemData.push(itemToStore)
  dbs.collection("salon").insertOne(itemToStore, function(err) {
    if (err) return err
  })
  console.log("updated itemData:", itemData)
  res.send(JSON.stringify(itemToStore))
})

app.post("/api/addImages", upload.array("imgs[]", 5), (req, res) => {
  console.log("********************* Add Images *****************")
  console.log(req.files)
  console.log("new file location", req.files.path)
  const itemToStore = {
    paths: []
  }
  req.files.forEach(file => {
    var extension = file.originalname.split(".").pop()
    fs.rename(file.path, file.path + "." + extension, () => {})
    // console.log("body", req.body)

    const path = "/" + file.filename + "." + extension

    itemToStore.paths.push(path)
    // console.log("updated imagesData:", imagesData)
  })
  console.log("item to store: ", itemToStore)
  console.log("paths to display: ", itemToStore.paths)
  // dbs.collection("images").insertOne(itemToStore)
  dbs.collection("images").insertOne(itemToStore, function(err) {
    if (err) throw err
    // Object inserted successfully.
    var objectId = itemToStore._id // this will return the id of object inserted
    console.log("object id: ", objectId, "  paths: ", itemToStore.paths)
    var dataToSend = { _id: objectId, paths: itemToStore.paths }
    console.log("dataToSend :", dataToSend)
    res.send(JSON.stringify(dataToSend))
  })
  // res.send(JSON.stringify(itemToStore.paths))
})

app.get("/api/getCloths", (req, res) => {
  dbs
    .collection("cloth")
    .find()
    .toArray((err, result) => {
      if (err) return err
      console.log("result: ", result)
      res.send(JSON.stringify({ success: true, cloths: result }))
    })
})
app.get("/api/getSalons", (req, res) => {
  dbs
    .collection("salon")
    .find()
    .toArray((err, result) => {
      if (err) return err
      console.log("result: ", result)
      res.send(JSON.stringify({ success: true, salons: result }))
    })
})
app.get("/api/getBaradi", (req, res) => {
  dbs
    .collection("baradi")
    .find()
    .toArray((err, result) => {
      if (err) return err
      console.log("result: ", result)
      res.send(JSON.stringify({ success: true, baradi: result }))
    })
})

app.use(bodyParser.raw({ type: "*/*" }))

app.post("/api/delGallery", (req, res) => {
  console.log(
    "************************* Delete Gallery *************************"
  )
  var body = JSON.parse(req.body)
  var gid = body.id
  console.log("id: ", gid)
  dbs.collection("images").deleteOne({ _id: ObjectID(gid) })
})
app.post("/api/delCloth", (req, res) => {
  console.log(
    "************************* Delete Cloth *************************"
  )
  var body = JSON.parse(req.body)
  var cid = body.id
  console.log("id: ", cid)
  dbs.collection("cloth").deleteOne({ _id: ObjectID(cid) })
  res.send(JSON.stringify({ success: true }))
})
app.post("/api/delSalon", (req, res) => {
  console.log(
    "************************* Delete Salon *************************"
  )
  var body = JSON.parse(req.body)
  var sid = body.id
  console.log("id: ", sid)
  dbs.collection("salon").deleteOne({ _id: ObjectID(sid) })
  res.send(JSON.stringify({ success: true }))
})
app.post("/api/delBaradi", (req, res) => {
  console.log(
    "************************* Delete baradi *************************"
  )
  var body = JSON.parse(req.body)
  var bid = body.id
  console.log("id: ", bid)
  dbs.collection("baradi").deleteOne({ _id: ObjectID(bid) })
  res.send(JSON.stringify({ success: true }))
})
app.post("/api/login", (req, res) => {
  console.log("************************* LOGIN *************************")
  var reqBody = JSON.parse(req.body)
  console.log("parsed in login: ", reqBody)
  var reqUn = reqBody.username
  var reqPass = reqBody.password
  console.log("Username: ", reqUn, " Password: ", reqPass)
  dbs
    .collection("admin")
    .find()
    .toArray((err, result) => {
      if (err) throw err
      console.log("result: ", result)
      var un = result[0].username
      var pw = result[0].password
      console.log("un: ", un, " pw: ", pw)
      if (reqBody.username !== un && reqBody.password !== pw) {
        res.send(
          JSON.stringify({
            success: false,
            msg: "Wrong username and password!"
          })
        )
      } else if (reqBody.username !== un) {
        res.send(JSON.stringify({ success: false, msg: "Wrong username!" }))
      } else if (reqBody.password !== pw) {
        res.send(JSON.stringify({ success: false, msg: "Wrong password!" }))
      } else {
        res.send(
          JSON.stringify({
            success: true,
            msg: "successfull login!",
            sessionId: generateId()
          })
        )
      }
    })
  //res.send(JSON.stringify("login"))
})

app.post("/api/updateData", (req, res) => {
  console.log("************************ update data *****************")
  var reqBody = JSON.parse(req.body)
  console.log("req body: ", reqBody)
  var passToChange = reqBody.oldPassword
  console.log("old pass: ", passToChange)
  dbs
    .collection("admin")
    .find({ password: passToChange })
    .toArray((err, result) => {
      if (err) throw err
      if (result.length === 0) {
        console.log("empty ", result)
        res.send(JSON.stringify({ success: false }))
      } else {
        console.log("result: ", result)
        dbs
          .collection("admin")
          .updateOne(
            { password: passToChange },
            { $set: { password: reqBody.newPassword } }
          )
        res.send(JSON.stringify({ success: true }))
      }
    })
})

app.post("/api/delAddedImage", (req, res) => {
  console.log("************************ delete added image *****************")
  console.log("path: ", JSON.parse(req.body))
  var pathToDel = JSON.parse(req.body)
  console.log("path to del: ", pathToDel)
  // dbs.collection("images").deleteOne({ paths: pathToDel })

  dbs
    .collection("images")
    .find({ paths: pathToDel })
    .toArray((err, result) => {
      console.log("result: ", result[0])
      var index = result[0].paths.indexOf(pathToDel)
      console.log("index: ", index)
      dbs
        .collection("images")
        .updateOne(
          { _id: result[0]._id },
          { $pull: { paths: { $in: [result[0].paths[index]] } } }
        )

      // var index = result[0].paths.indexOf(pathToDel)
      // console.log("index: ", index)
      // result[0].paths.splice(index, 1)
      // console.log(result[0].paths)
      // res.send(JSON.stringify(result))
    })
})
app.get("/api/getImages", (req, res) => {
  console.log("************************ get images *****************")
  dbs
    .collection("images")
    .find({})
    .toArray((err, result) => {
      console.log("result: ", result)
      res.send(JSON.stringify(result))
    })
})
app.post("/api/getImagesGallery", (req, res) => {
  console.log("************************ get images Gallery*****************")
  var reqBody = JSON.parse(req.body)
  console.log("reqbody: ", reqBody)

  dbs
    .collection("images")
    .find({ _id: ObjectID(reqBody) })
    .toArray((err, result) => {
      console.log("result: ", result)
      res.send(JSON.stringify(result))
    })
})

app.use(express.static("../frontend/build"))
// app.use(express.static(__dirname + "../frontend/public"))
app.use(express.static(__dirname + "/images"))

const path = require("path")
app.get("*", (req, res) => {
  // res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"))
})

app.listen(80, function() {
  //change it to 80
  console.log("Server started on port 80")
})

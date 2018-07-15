
User.create!([
  {name: "Liz", email: "liz.reyeshe@gmail.com", password_digest:"password"} 
])
Animal.create!([
  {name: "Rat", image_url: "https://www.petful.com/wp-content/uploads/2017/04/5965461158_7de0734bf4_b.jpg"},
  {name: "Guinea Pig", image_url: "https://images.pexels.com/photos/33827/guinea-pig-smooth-hair-young-animal-black-and-white-agouti.jpg?auto=compress&cs=tinysrgb&h=350"}
])
Question.create!([
  {tittle: "Rat swolen toe", text: "Help! my rat has a swollen abdomen and is being lethargic", symptoms: "Swollen addomen", animal_id:1, user_id:1},
  {tittle: "Piggie has a bumble foot", text: "What shoudl I do?", symptoms: "Swollen foot", animal_id:2, user_id:1}
])
Image.create!([
  {image_url: "http://www.ipadmini2wallpapers.com/wp-content/uploads/Funny/1024/Funny%2053%20iPad%20mini%20Wallpapers%20HD.jpg", question_id:1},
  {image_url: "https://tse1.mm.bing.net/th?id=OIP.6NX84SWmI34cedWCwa6IAQHaF7&w=221&h=177&c=7&o=5&dpr=2&pid=1.7", question_id:2}
])

Answer.create!([
  {text: "Inflamation can be due to liver issues, tumor, or indigestion", question_id:1, user_id:1},
  {text: "I think your rattie might have eaten too much....", question_id:1, user_id:1},
  {text: "She will need surgery", question_id:2, user_id:1}
])

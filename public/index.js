/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Animalia",
      animals: []
    };
  },
  created: function() {
    axios.get("/api/animals").then(
      function(response){
        this.animals = response.data;
        console.log(this.animals);
      }.bind(this));
  },
  methods: {},
  computed: {}
};

var AnimalShowPage = {
  template: "#animal-show-page",
  data: function() {
    return {
      animal: {},
      newQuestion: []
    };
  },
  created: function() {
    axios.get("/api/animals/" + this.$route.params.id ).then(function(response) {
      this.animal = response.data;
      console.log(this.animal);
    }.bind(this));
  },
  methods: {
    deleteQuestion: function(question) {
      axios.delete("/api/questions/" + question.id).then(function(response){
        var index = this.animal.questions.indexOf(question);
        this.animal.questions.splice(index,1);
      }.bind(this));
    },
    getUserId: function() {
      return localStorage.getItem("user_id");
    }
  },
  computed: {}
};

var NewQuestionPage = {
  template: "#new-question-page",
  data: function() {
    return {
      tittle: "",
      text: "",
      symptoms: "",
      image_url: "",
      animal_id: ""
    };
  },
  created: function() {
    axios.get("/api/questions").then(
      function(response) {
        this.categories = response.data;
        console.log(this.categories);
      }.bind(this));
  },
  methods: {
    addQuestion: function() {
      var clientParams = {
        tittle: this.tittle, 
        text: this.text,
        symptoms: this.symptoms,
        animal_id: this.animal_id,
        image_url: this.image_url
      };
    axios.post("/api/questions", clientParams).then(function(response){
      this.tittle = "",
      this.text = "",
      this.symptoms = "",
      this.image_url = "",
      this.animal_id = ""
    }.bind(this));
    router.push("/animals/" + this.animal_id)
    },
  },
  computed: {}
};

var QuestionEditPage = {
  template: "#question-edit-page",
  data: function() {
    return {
      tittle: "",
      text: "",
      symptoms: "",
      image_url: ""
    };
  },
  created: function() {
    axios.get("/api/questions/" + this.$route.params.id).then(function(response){
      this.tittle = response.data.tittle;
      this.text = response.data.text;
      this.symptoms = response.data.symptoms;
      this.image_url = response.data.images[0].image_url
      console.log(response.data)
    }.bind(this));
  },
  methods: {
    submit: function() {
      var params = {
        tittle: this.tittle,
        text: this.text,
        symptoms: this.symptoms,
        image_url: this.image_url,
      };
      axios
        .patch("/api/questions/" + this.$route.params.id, params)
        .then(function(response) {
          router.push("/questions/" + this.$route.params + "/edit".id, params);
        }.bind(this)
      );
    }
  }
};

var QuestionShowPage = {
  template: "#question-show-page",
  data: function() {
    return {
      question: {},
      newAnswer: []

    };
  },
  created: function() {
    axios.get("/api/questions/" + this.$route.params.id ).then(function(response) {
      this.question = response.data;
      console.log(this.question);
    }.bind(this));
  },
  methods: {
    addAnswer: function() {
      var clientParams = {
        text: this.newAnswer.text,
        question_id: this.$route.params.id
      }
    axios.post("/api/answers", clientParams).then(function(response){
      this.question.answers.push(response.data);
      this.newAnswer.text = ""
    }.bind(this));
  },
    deleteAnswer: function(answer) {
      axios.delete("/api/answers/" + answer.id).then(function(response){
        var index = this.question.answers.indexOf(answer);
        this.question.answers.splice(index,1);
      }.bind(this));
    },
    getUserId: function() {
      return localStorage.getItem("user_id");
    }
  },
  computed: {}
};

var AnswerEditPage = {
  template: "#answer-edit-page",
  data: function() {
    return {
      text: ""
    };
  },
  created: function() {
    axios.get("/api/answers/" + this.$route.params.id).then(function(response){
      this.text = response.data.text;
    }.bind(this));
  },
  methods: {
    submit: function() {
      var params = {
        text: this.text
      };
      axios
        .patch("/api/answers/" + this.$route.params.id, params)
        .then(function(response) {
          router.push("/questions/" + response.data.question_id);
           console.log(response.data)
        }.bind(this)
      );
    }
  }
};

var UserProfilePage = {
  template: "#user-profile-page",
  data: function() {
    return {
      user: {},
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id ).then(function(response) {
      this.user = response.data;
      console.log(this.user);
    }.bind(this));
  },
  methods: {
    deleteQuestion: function(question) {
      axios.delete("/api/questions/" + question.id).then(function(response){
        var index = this.user.questions.indexOf(question);
        this.user.questions.splice(index,1);
      }.bind(this));
    },
    deleteUser: function(user) {
      axios.delete("/api/users/" + user.id).then(function(response){
        var index = this.user.indexOf(user);
        this.user.splice(index,1);
      }.bind(this));
    },
    isCurrentUser: function() {
      return localStorage.getItem("user_id") === this.user.id 
    }
  },
  computed: {}
};

var SignupPage = {
  template: "#signup-page",
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/api/users", params)
        .then(function(response) {
          router.push("/login");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var LoginPage = {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user.id);
          router.push("/animals");
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  }
};

var LogoutPage = {
  template: "<h1>Logout</h1>",
  created: function() {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("jwt");
    localStorage.removeItem("user_id");
    router.push("/");
  }
};



var router = new VueRouter({
  routes: [
  { path: "/animals", component: HomePage },
  { path: "/signup", component: SignupPage },
  { path: "/login", component: LoginPage },
  { path: "/logout", component: LogoutPage },
  { path: "/animals/:id", component: AnimalShowPage},
  { path: "/questions/new", component: NewQuestionPage},
  { path: "/questions/:id", component: QuestionShowPage},
  { path: "/questions/:id/edit", component: QuestionEditPage},
  { path: "/answers/:id/edit", component:AnswerEditPage},
  { path: "/users/:id", component:UserProfilePage}
  ],
  
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});


var app = new Vue({
  el: "#vue-app",
  router: router,
  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
  },
  methods: {
    isLoggedIn: function() {
      if(localStorage.getItem("jwt")) {
        return true;
      }
      return false;
    }
  }
});

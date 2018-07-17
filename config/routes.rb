Rails.application.routes.draw do

  post '/user_token' => 'user_token#create'
  # STEP 1: A ROUTE triggers a controller action
  # verb "/urls" => "namespace/controllers#action"

  namespace :api do 

    #animals
    get "/animals" => "animals#index"
    get "/animals/:id" => "animals#show"


    #questions
    get "/questions" => "questions#index"
    post "/questions" => "questions#create"
    get "/questions/:id" => "questions#show"
    patch "/questions/:id" => "questions#update"
    delete "/questions/:id" => "questions#destroy"  


    #answers
    get "/answers" => "answers#index"
    post "/answers" => "answers#create"
    get "/answers/:id" => "answers#show"
    patch "/answers/:id" => "answers#patch"
    delete "/answers/:id" => "answers#destroy"

    #users
    post "/users" => "users#create"
  end 



end

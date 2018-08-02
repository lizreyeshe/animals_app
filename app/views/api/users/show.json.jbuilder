json.partial! @user, partial: 'user', as: :user

json.questions do
json.array! @user.questions, partial: "api/questions/question", as: :question
end


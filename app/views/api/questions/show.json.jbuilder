json.partial! @question, partial: 'question', as: :question

json.images do
  json.array! @question.images, partial: "api/images/image", as: :image
end

json.answers do
  json.array! @question.answers, partial: "api/answers/answer", as: :answer
end
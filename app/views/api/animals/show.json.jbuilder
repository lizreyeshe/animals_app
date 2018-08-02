json.partial! @animal, partial: 'animal', as: :animal

json.questions do 
  json.array! @animal.questions, partial:"api/questions/question", as: :question
end 


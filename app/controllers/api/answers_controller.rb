class Api::AnswersController < ApplicationController

  def index 
    @answers = Answer.all 
    render "index.json.jbuilder"
  end 

  def create 
    @answer = Answer.new(
      text: params[:text],
      question_id: params[:question_id],
      user_id: current_user.id
      )
    @answer.save
    render "show.json.jbuilder"
  end 

  def show
    @answer = Answer.find_by(id: params[:id])
    render "show.json.jbuilder"
  end 

  def update
    @answer = Answer.find_by(id:params[:id])
    @answer.text = params[:text] || @question.text
    
    @answer.save
    render "show.json.jbuilder"
  end 

  def destroy
    answer_id = params[:id]
    @answer = Answer.find(answer_id)
    @answer.destroy
    render json: {message: "Answer has deleted"}
  end 

end

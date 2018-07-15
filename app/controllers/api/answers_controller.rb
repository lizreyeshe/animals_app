class Api::AnswersController < ApplicationController

  def index 
    @answers = Answer.all 
    render "index.json.jbuilder"
  end 

  def create 
    @answer = Answer.new(
      text: params[:text]
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

    render "show.json.jbuilder"
  end 

  def destroy
    @answer = Answer.find_by(id:params[:id])

    @answer.destroy
    render json: {message: "Answer has deleted"}
  end 

end

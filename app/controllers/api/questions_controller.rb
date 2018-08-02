class Api::QuestionsController < ApplicationController

  def index 
    @questions = Question.all
    render "index.json.jbuilder"
  end 


  def create 
    @question = Question.new(
      tittle: params[:tittle],
      text: params[:text],
      symptoms: params[:symptoms],
      animal_id: params[:animal_id],
      user_id: current_user.id,
    )
    puts current_user.id
    @question.save

     @image = Image.new(
      image_url: params[:image_url],
      question_id: @question.id
      )

     @image.save
    render "show.json.jbuilder"

  end 

  def show 
    @question = Question.find_by(id: params[:id])
    render "show.json.jbuilder"
  end 

  def update 
    @question = Question.find_by(id:params[:id])

    @question.tittle = params[:tittle] || @question.tittle
    @question.text = params[:text] || @question.text
    @question.symptoms = params[:text] || @question.text

    @question.save

    render "show.json.jbuilder"
  end 

  def destroy 
    question_id = params[:id]
    @question = Question.find(question_id)
    @question.destroy
    render json: {message: "Question has been successfully deleted"}

  end 

  def destroy 
    @question = Question.find_by(id: params[:id])
    @question.destroy

    render json: {message: "Question has been deleted"}
  end 

end

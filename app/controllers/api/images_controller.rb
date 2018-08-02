class Api::ImagesController < ApplicationController

  def index 
    @images = Image.all
    render "index.json.jbuilder"
  end 

  def create 
    @image = Image.new(
      Image_url: params[:image_url],
      question_id: params[:question_id],
    )
    
    @image.save
    render "show.json.jbuilder"

  end 




end

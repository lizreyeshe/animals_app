class Api::AnimalsController < ApplicationController

  def index 
    @animals = Animal.all 
    render "index.json.jbuilder"
  end 

  def show
    @animal = Animal.find_by(id:params[:id])
    render "show.json.jbuilder"
  end 

end

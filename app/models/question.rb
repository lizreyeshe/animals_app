class Question < ApplicationRecord
  belongs_to :animal
  belongs_to :user

  has_many :answers
  has_many :images

  def friendly_created_at
    created_at.strftime("%A, %b %d")
  end 
end

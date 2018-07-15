class Question < ApplicationRecord
  belongs_to :animal
  belongs_to :user

  has_many :answers
  has_many :images
end

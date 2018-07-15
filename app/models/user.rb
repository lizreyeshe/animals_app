class User < ApplicationRecord
  has_secure_password
  has_many :answers 
  has_many :questions
end

class Rate < ActiveRecord::Base
  attr_accessible :amt_borrowed, :house_id, :name, :rate, :user_id
end

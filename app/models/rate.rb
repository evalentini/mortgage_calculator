class Rate < ActiveRecord::Base
  attr_accessible :name, :rate, :term, :principal, :user_id

	# save all the rates from most recent calculation 
	def self.set(rate, term, principal, user_id)
		#delete all rates from db with user_id=user_id 
		Rate.destroy_all(:user_id => user_id)
		#add each rate from calculator 
		rate.each_with_index do |val, index| 
			Rate.create  :rate => rate[index], 
									 :term => term[index], 
									 :principal => principal[index],
									 :user_id => user_id
		end		
	end


end

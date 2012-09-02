class RatesController < ApplicationController
  # GET /rates
  # GET /rates.json
  def index
	end

	def save
		# check if logged in
		if session[:user_id].nil?
			# check if we can login using cookies
			if cookies[:user_id].present? && cookies[:password].present?
				user = User.authenticate_with_id(cookies[:user_id], cookies[:password])	
			end
			unless user.present?
				flash[:notice]="login error user_id=#{cookies[:user_id]} pwd=#{cookies[:password]}"
				redirect_to :action => "index"
			end
		end 
		# add new rate objects
		@user_id=cookies[:user_id]
		@rate=[]
		@term = []
		@principal = []
		
		params[:whole_rate].each_with_index do |val, index| 
			@rate[index] = (params[:whole_rate][index].to_f + params[:frac_rate][index].to_f/100)/100
			@term[index] = params[:loan_term][index].to_i
			@principal[index]=params[:principal_thousands][index].to_i*1000+params[:principal_singles][index].to_i	 
		end

		#add the rate information to the database
		Rate.set(@rate, @term, @principal, @user_id.to_i)	
		
	 
	end	
	
	def load
		redirect_to :action => "index" unless session[:user_id].present?
		@rates = Rate.find_all_by_user_id(session[:user_id].to_i) 
		@user_id = session[:user_id].to_i 
	end 

	def all
    @rates = Rate.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @rates }
    end
  end

  # GET /rates/1
  # GET /rates/1.json
  def show
    @rate = Rate.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @rate }
    end
  end

  # GET /rates/new
  # GET /rates/new.json
  def new
    @rate = Rate.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @rate }
    end
  end

  # GET /rates/1/edit
  def edit
    @rate = Rate.find(params[:id])
  end

  # POST /rates
  # POST /rates.json
  def create
    @rate = Rate.new(params[:rate])

    respond_to do |format|
      if @rate.save
        format.html { redirect_to @rate, notice: 'Rate was successfully created.' }
        format.json { render json: @rate, status: :created, location: @rate }
      else
        format.html { render action: "new" }
        format.json { render json: @rate.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /rates/1
  # PUT /rates/1.json
  def update
    @rate = Rate.find(params[:id])

    respond_to do |format|
      if @rate.update_attributes(params[:rate])
        format.html { redirect_to @rate, notice: 'Rate was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @rate.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /rates/1
  # DELETE /rates/1.json
  def destroy
    @rate = Rate.find(params[:id])
    @rate.destroy

    respond_to do |format|
      format.html { redirect_to rates_url }
      format.json { head :no_content }
    end
  end
end

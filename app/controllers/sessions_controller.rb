class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.authenticate(params[:login], params[:password])
    if user
      session[:user_id] = user.id
			cookies[:user_id] = user.id
			cookies[:password] = params[:password]
      redirect_to root_url, :notice => "Logged in successfully."
    else
      flash.now[:alert] = "Invalid login or password."
      render :action => 'new'
    end
  end

  def destroy
    session[:user_id] = nil
		cookies[:user_id]=nil
		flash[:notice] = "You have been logged out"
    redirect_to root_url, :notice => "You have been logged out."
  end
end

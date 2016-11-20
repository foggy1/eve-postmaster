class AuthorizationController < ApplicationController
  include Authorization
  
  def redirect
    redirect_to get_redirect
  end

  def access
    response = get_token
    @tokens = {
      access_token: response.body["access_token"],
      refresh_token: response.body["refresh_token"]
    }
    session[:tokens] = @tokens
    session[:char_id] = get_char_id

    redirect_to '/mails/new'
  end

end

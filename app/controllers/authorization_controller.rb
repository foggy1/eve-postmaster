class AuthorizationController < ApplicationController
  # CLIENT_ID = Rails.application.secrets.eve_client_id
  # CLIENT_SECRET = Rails.application.secrets.eve_client_secret
  include Authorization
  def redirect
    base_url = 'https://login.eveonline.com/oauth/authorize/?'
    params = {
      response_type: 'code',
      # redirect_uri: 'https://eve-postmaster.herokuapp.com/callback',
      redirect_uri: 'http://localhost:3000/callback',
      client_id: Rails.application.secrets.eve_client_id,
      scope: 'characterAccountRead characterAssetsRead characterClonesRead characterContactsRead characterContactsWrite characterFittingsRead characterFittingsWrite characterKillsRead characterLocationRead characterMarketOrdersRead characterNavigationWrite corporationMembersRead remoteClientUI characterMailRead',
      state: 'idk123'
    }.to_query
    redirect_to base_url + params
  end

  def access
    auth_head = Base64.encode64("#{Rails.application.secrets.eve_client_id}:#{Rails.application.secrets.eve_client_secret}").delete("\n")
    headers = { "Authorization" => "Basic #{auth_head}",
                "Content-Type" =>  "application/x-www-form-urlencoded",
                "Host" => "login.eveonline.com"
    }
    parameters = {
      "grant_type" => "authorization_code",
      "code" => "#{params[:code]}"
    }
    response = Unirest.post "https://login.eveonline.com/oauth/token",
                          headers:headers,
                          parameters:parameters
    @tokens = {
      access_token: response.body["access_token"],
      refresh_token: response.body["refresh_token"]
    }
    session[:tokens] = @tokens
    session[:char_id] = get_char_id

    redirect_to '/mails/new'
  end
end

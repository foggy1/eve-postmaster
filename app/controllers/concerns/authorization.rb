module Authorization
  extend ActiveSupport::Concern
  def get_redirect
    base_url = 'https://login.eveonline.com/oauth/authorize/?'
    params = {
      response_type: 'code',
      redirect_uri: 'https://eve-postmaster.herokuapp.com/callback',
      # redirect_uri: 'http://localhost:3000/callback',
      client_id: Rails.application.secrets.eve_client_id,
      scope: 'characterContactsRead remoteClientUI',
      state: 'idk123'
    }.to_query
    base_url + params
  end

  def get_token
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
  end

  def get_char_id
    headers = { "User-Agent" => "...",
                "Authorization" =>  "Bearer #{session[:tokens][:access_token]}",
                "Host" => "login.eveonline.com"
    }


    response = Unirest.get "https://login.eveonline.com/oauth/verify",
                headers:headers
    response.body["CharacterID"]
  end

  def get_corp
    headers = { "User-Agent" => "...",
                "Authorization" =>  "Bearer #{session[:tokens][:access_token]}",
                "Host" => "login.eveonline.com"
    }


    response = Unirest.get "https://crest-tq.eveonline.com/characters/#{session[:char_id]}/",
               headers:headers
    response.body["corporation"]["name"]
  end
end

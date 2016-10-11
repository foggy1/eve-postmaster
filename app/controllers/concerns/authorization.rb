module Authorization
  extend ActiveSupport::Concern
  def get_char_id
    headers = { "User-Agent" => "...",
                "Authorization" =>  "Bearer #{session[:tokens][:access_token]}",
                "Host" => "login.eveonline.com"
    }


    response = Unirest.get "https://login.eveonline.com/oauth/verify",
                headers:headers
    return response.body["CharacterID"]
  end
end

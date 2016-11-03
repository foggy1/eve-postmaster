class MailsController < ApplicationController
  # for setup
  def new
    access_token = session[:tokens]["access_token"]
    the_headers = {
      "Authorization" => "Bearer #{access_token}",
      "Host" => "crest-tq.eveonline.com",
      "Content-Type" => "application/json"
    }
    response = Unirest.get "https://crest-tq.eveonline.com/characters/#{session[:char_id]}/contacts/",
               headers:the_headers
    @contacts = response.body["items"].map { |item| { name: item["character"]["name"], id: item["character"]["id_str"] } if item["character"] }.select { |item| item }

    render 'mails/new'
  end

  def create
    # params = params.to_unsafe_h
    parameters = params.to_unsafe_h
    recip = JSON.parse(parameters["recipients"]).map{ |id| {"id" => id.to_i} }
    access_token = session[:tokens]["access_token"]
    the_headers = {
      "Authorization" => "Bearer #{access_token}",
      "Host" => "crest-tq.eveonline.com",
      "Content-Type" => "application/json"
    }
    the_parameters = {
      "subject" => parameters[:subject],
      "body" => "<color=0xffFF33F9>" + parameters[:body],
      "recipients" => recip
    }.to_json
    response = Unirest.post "https://crest-tq.eveonline.com/characters/#{session[:char_id]}/ui/openwindow/newmail/",
        headers:the_headers,
        parameters:the_parameters
    
  end
end






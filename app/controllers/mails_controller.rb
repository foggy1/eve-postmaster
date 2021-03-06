class MailsController < ApplicationController
  include Mails

  def new
    not_found unless session[:tokens]
    @contacts = scrub_contacts(get_contacts)
    @corp = session[:corp]
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






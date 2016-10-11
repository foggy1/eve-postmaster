Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'welcome#index'
  get '/authorize' => 'authorization#redirect'
  get '/callback' => 'authorization#access'
  get '/mails/new' => 'mails#new'
  post 'mails/create' => 'mails#create'
end

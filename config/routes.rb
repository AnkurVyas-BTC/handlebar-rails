Rails.application.routes.draw do

  resources :books, defaults: {format: :json}
  root to: 'books#listing'
end

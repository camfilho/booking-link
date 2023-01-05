Rails.application.routes.draw do
  root 'homepage#index'

  namespace :api do
    namespace :v1 do
      resources :slots, only: [:index, :create]
    end
  end
end

Rails.application.routes.draw do
  root 'homepage#index'

  mount ActionCable.server => '/cable'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :slots, only: [:index, :create]
    end
  end
end
